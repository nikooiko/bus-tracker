package gr.bus_tracker.driver_app.utils;

import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.widget.TextView;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by nick on 4/15/17.
 */

public abstract class TextInputValidator implements TextWatcher {
	@Override
	public void beforeTextChanged(CharSequence s, int start, int count, int after) {
		/* Ignore */
	}

	@Override
	public void onTextChanged(CharSequence s, int start, int before, int count) {
		/* Ignore */
	}

	@Override
	public void afterTextChanged(Editable s) {
		validate();
	}

	public abstract void validate();
}
