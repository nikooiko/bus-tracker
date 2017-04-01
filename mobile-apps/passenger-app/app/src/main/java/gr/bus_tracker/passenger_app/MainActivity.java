package gr.bus_tracker.passenger_app;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;

/**
 * Created by nick on 4/1/17.
 */

public class MainActivity extends AppCompatActivity {
	public static final String EXTRA_MESSAGE = "gr.bus_tracker.passenger-app.MESSAGE";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}

	/**
	 * Called when the user taps the Send Button
	 */
	public void sendMessage(View view) {
		Intent intent = new Intent(this, DisplayMessageActivity.class); // create the intent
		EditText editText = (EditText) findViewById(R.id.editText); // get the input field
		String message = editText.getText().toString(); // get message from input
		intent.putExtra(EXTRA_MESSAGE, message); // add message to intent
		startActivity(intent);
	}
}
