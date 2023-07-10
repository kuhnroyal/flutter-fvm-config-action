# flutter-fvm-config-action
An action that parses an [FVM](https://github.com/leoafarias/fvm) config file into environment variables which 
can then be used to configure the [flutter-action](https://github.com/subosito/flutter-action).


## Usage

### Basic usage
```yaml
    steps:
      - uses: actions/checkout@v2
      - uses: kuhnroyal/flutter-fvm-config-action@v1
        id: fvm-config-action
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```

### Custom config path
```yaml
    steps:
      - uses: actions/checkout@v2
      - uses: kuhnroyal/flutter-fvm-config-action@v1
        id: fvm-config-action
        with:
          path: 'some-path/.fvm/fvm_config.json'
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```

### Reading specific flavor
```yaml
    steps:
      - uses: actions/checkout@v2
      - uses: kuhnroyal/flutter-fvm-config-action@v1
        id: fvm-config-action
        with:
          flavor: 'staging'
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```