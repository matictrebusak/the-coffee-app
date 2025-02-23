import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Configuration, ConfigurationParameters } from './api/v1';
import { provideHttpClient } from '@angular/common/http';

export function withBackendApiConfiguration(
  configurationParameters: ConfigurationParameters = {}
): Configuration {
  return new Configuration({
    // any default parameters
    basePath: 'my-default-api',
    // overrides
    ...configurationParameters,
  });
}

export function provideApi(
  withConfiguration: Configuration = withBackendApiConfiguration()
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: Configuration, useValue: withConfiguration },
    provideHttpClient(),
  ]);
}
