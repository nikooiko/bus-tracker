package gr.bus_tracker.driver_app.core;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import gr.bus_tracker.driver_app.R;

/**
 * Created by nick on 5/20/17.
 */

public class BaseActivity extends AppCompatActivity {
	protected int layout;

	public BaseActivity(int layout) {
		super();
		this.layout = layout;
	}

	@Override
	protected void onCreate(@Nullable Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(this.layout);

		Toolbar myToolbar = (Toolbar) findViewById(R.id.custom_action_bar);
		setSupportActionBar(myToolbar);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main_menu, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch(item.getItemId()) {
			case R.id.about:
//				Toast.makeText(this, R.string.about_toast, Toast.LENGTH_LONG).show();
				return(true);
			case R.id.exit:
				finish();
				return(true);
		}
		return(super.onOptionsItemSelected(item));
	}
}
