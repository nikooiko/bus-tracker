package gr.bus_tracker.driver_app;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

/**
 * Created by nick on 5/14/17.
 */

public class StubProvider extends ContentProvider {
	/**
   * Always return true, indicating that the
   * provider loaded correctly.
   */
	@Override
	public boolean onCreate() {
		return true;
	}

	/**
   * query() always returns no results
   *
   */
	@Nullable
	@Override
	public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
		return null;
	}

	/**
   * Return no type for MIME type
   */
	@Nullable
	@Override
	public String getType(@NonNull Uri uri) {
		return null;
	}

	/**
   * insert() always returns null (no URI)
   */
	@Nullable
	@Override
	public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
		return null;
	}

	/**
   * delete() always returns "no rows affected" (0)
   */
	@Override
	public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) {
		return 0;
	}

	/**
   * update() always returns "no rows affected" (0)
   */
	@Override
	public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) {
		return 0;
	}
}
