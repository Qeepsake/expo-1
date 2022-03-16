package expo.modules.easclientid

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class EASClientIdModule : Module() {
  private val context
    get() = requireNotNull(appContext.reactContext) {
      "React Application Context is null"
    }

  override fun definition() = ModuleDefinition {
    name("EASClientId")

    function("getClientIdAsync") {
      EASClientId(context).uuid.toString()
    }
  }
}
