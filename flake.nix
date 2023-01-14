{
  description = "My Nix flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.11";
    unstable.url = "github:nixos/nixpkgs/nixos-unstable";

    snowfall-lib = {
      url = "github:snowfallorg/lib";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs:
    inputs.snowfall-lib.mkFlake {
      inherit inputs;

      src = ./.;

      outputs-builder = channels:
        let
          inherit (channels.nixpkgs) lib buildNpmPackage writeShellScript nodejs substitute;
          inherit (lib) getExe;

          run-node-script = writeShellScript "run-node-script" ''
            export NODE_PATH="@nodePath@"
            export STATIC_DIR="@staticDir@"
            ${getExe nodejs} @nodeScript@
          '';
        in
        {
          packages = rec {
            default = scrumfish-backend;

            scrumfish-frontend = buildNpmPackage {
              pname = "scrumfish-frontend";
              version = inputs.self.sourceInfo.shortRev or "dirty";

              src = ./frontend;

              npmFlags = [ "--ignore-scripts" ];

              npmDepsHash = "sha256-sdh4Y08I6m6IARazTSYznBct0bENb2G6Mfqimway9ns";

              postBuild = ''
                NO_MODULE_SCRIPT="<script nomodule src=\"\\/scripts\\/bundle.js\"><\\/script>"
                MODULE_SCRIPT="<script type=\"module\" src=\"\\/scripts\\/bundle.modern.js\"><\\/script>"
                sed -i "s/<\!-- INJECT:SCRIPT -->/''${NO_MODULE_SCRIPT}''${MODULE_SCRIPT}/g" ./public/index.html
              '';

              installPhase = ''
                mv public $out
              '';
            };

            scrumfish-backend = buildNpmPackage {
              pname = "scrumfish-backend";
              version = inputs.self.sourceInfo.shortRev or "dirty";

              src = ./backend;

              npmFlags = [ "--ignore-scripts" ];

              staticDir = scrumfish-frontend;

              npmDepsHash = "sha256-oaXXs98HWlYXlRlMGgUdXeZBU9eoYkXGxAUHdLqBYIk";

              dontNpmBuild = true;

              installPhase = ''
                bin_target=$out/bin/scrumfish
                libexec_target=$out/libexec/scrumfish

                mkdir -p $(dirname $bin_target)
                mkdir -p $libexec_target

                mv src $libexec_target/
                mv node_modules $libexec_target/

                substitute ${run-node-script} $bin_target \
                  --replace "@nodePath@" "$libexec_target/node_modules" \
                  --replace "@staticDir@" "$staticDir" \
                  --replace "@nodeScript@" "$libexec_target/src/index.js"

                chmod +x $bin_target
              '';
            };
          };
        };
    };
}
