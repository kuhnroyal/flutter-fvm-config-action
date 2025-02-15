# flutter-fvm-config-action

An action that parses an [FVM](https://github.com/leoafarias/fvm) config file `.fvmrc` and configures the [subosito/flutter-action](https://github.com/subosito/flutter-action)
to install the Flutter SDK.

An additional action is provided that just parses the FVM config into outputs & environment variables which 
can then be used to manually configure the [subosito/flutter-action](https://github.com/subosito/flutter-action).

## Usage

### Basic setup `kuhnroyal/flutter-fvm-config-action/setup`

The configuration will parse the FVM configuration and use subosito/flutter-action to install the configured Flutter version.

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action/setup@v3
```

### Manual configuration & setup `kuhnroyal/flutter-fvm-config-action/config`

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action/config@v3
        id: fvm-config-action
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: ${{ steps.fvm-config-action.outputs.FLUTTER_VERSION }}
          channel: ${{ steps.fvm-config-action.outputs.FLUTTER_CHANNEL }}
```

> [!IMPORTANT]  
> The main action `kuhnroyal/flutter-fvm-config-action` will continue to work and can be configured either way.

## Configuration inputs

All the sample options below can be combined with each other.

### Custom config path

If you have a custom path for your `.fvmrc` file, you can set it with the `path` input.

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action/setup@v3
        with:
          path: 'some-path/.fvmrc'
```

### FVM flavor

If you require a specific flavor, you can set it with the `flavor` input.

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action/setup@v3
        with:
          flavor: 'staging'
```

### Enable Dart/Flutter analytics

Analytics are disabled by default. To enable them, set `disable-analytics` to `false`.

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action/setup@v3
        with:
          disable-analytics: false
```


### Post setup script

Run custom Flutter configuration here.

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: kuhnroyal/flutter-fvm-config-action/setup@v3
        with:
          post-setup-script: |
            echo "Setup done!"
            flutter config --enable-swift-package-manager
```

### Caching

This action supports all cache inputs from the [subosito/flutter-action](https://github.com/subosito/flutter-action):
See https://github.com/subosito/flutter-action#caching for more information.
