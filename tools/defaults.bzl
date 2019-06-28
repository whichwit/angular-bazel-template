"""Re-export of some bazel rules with repository-wide defaults."""

load("@build_bazel_rules_nodejs//:defs.bzl", _npm_package = "npm_package")
load("@npm_angular_bazel//:index.bzl", _ng_module = "ng_module", _ng_package = "ng_package")
load("@npm_bazel_typescript//:index.bzl", _ts_library = "ts_library")

DEFAULT_TSCONFIG = "//projects:tsconfig.json"
DEFAULT_TSCONFIG_TEST = "//projects:tsconfig-test.json"
NG_VERSION = "^8.0.0"
RXJS_VERSION = "^6.4.0"

def ng_module(name, tsconfig = None, entry_point = None, testonly = False, deps = [], module_name = None, bundle_dts = True, **kwargs):
    """Default values for ng_module"""
    deps = deps + ["@npm//tslib"]
    if testonly:
        # Match the types[] in //packages:tsconfig-test.json
        deps.append("@npm//@types/node")
    if not tsconfig and testonly:
        tsconfig = DEFAULT_TSCONFIG_TEST
    if not entry_point:
        entry_point = "public_api.ts"

    _ng_module(
        name = name,
        flat_module_out_file = name,
        tsconfig = tsconfig,
        entry_point = entry_point,
        testonly = testonly,
        bundle_dts = bundle_dts,
        deps = deps,
        module_name = module_name,
        **kwargs
    )