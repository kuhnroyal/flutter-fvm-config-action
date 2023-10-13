# flutter-fvm-config-action
An action that parses an [FVM](https://github.com/leoafarias/fvm) config file (.fvmrc) into environment variables which 
can then be used to configure the [flutter-action](https://github.com/subosito/flutter-action).

## Breaking changes

### v1 -> v2
- The action now reads the FVM config file from the default FVM 3.x location `.fvmrc`.
  If the old behavior of reading the config from `.fvm/fvm_config.json` is desired, the `path` input can be used to
  specify the old location. Alternatively, `kuhnroyal/fvm-config-action@v1` can be used to stick with the old behavior.

## Usage

### Basic usage
```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action@v2
        id: fvm-config-action
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```

### Custom config path
```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action@v2
        id: fvm-config-action
        with:
          path: 'some-path/.fvmrc'
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```

### Reading specific flavor
```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action@v2
        id: fvm-config-action
        with:
          flavor: 'staging'
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```