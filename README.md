# flutter-fvm-config-action
An action that parses an [FVM](https://github.com/leoafarias/fvm) config file (.fvmrc) into environment variables which 
can then be used to configure the [flutter-action](https://github.com/subosito/flutter-action).

## Usage

All the sample options below can be combined with each other.

### Basic usage

The configuration will parse the FVM configuration and use subosito/flutter-action to install the configured Flutter version.

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action@v2
        with:
          # The setup flag will default to true in the next major version (v3)
          setup: true
```

### Basic usage with manual configuration
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