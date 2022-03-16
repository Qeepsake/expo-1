// Copyright 2015-present 650 Industries. All rights reserved.

import ExpoModulesCore

public class EASClientIdModule: Module {
  public func definition() -> ModuleDefinition {
    name("EASClientId")

    function("getClientIdAsync") {
      EASClientId.uuid.uuidString
    }
  }
}
