package expo.modules.easclientid

import android.content.Context
import java.util.UUID

private const val PREFERENCES_FILE_NAME = "host.exp.exponent.EASSharedPreferences"
private const val EAS_CLIENT_ID_SHARED_PREFERENCES_KEY = "eas-client-id"

class EASClientId(private val context: Context) {
  val uuid: UUID by lazy {
    val sharedPreferences = context.getSharedPreferences(PREFERENCES_FILE_NAME, Context.MODE_PRIVATE)
    if (!sharedPreferences.contains(EAS_CLIENT_ID_SHARED_PREFERENCES_KEY)) {
      with(sharedPreferences.edit()) {
        putString(EAS_CLIENT_ID_SHARED_PREFERENCES_KEY, UUID.randomUUID().toString())
        apply()
      }
    }

    UUID.fromString(sharedPreferences.getString(EAS_CLIENT_ID_SHARED_PREFERENCES_KEY, null) ?: throw Exception("No EAS client ID set"))
  }
}
