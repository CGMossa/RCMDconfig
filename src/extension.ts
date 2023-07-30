// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { execSync } from 'child_process';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "RCMDconfig" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('RCMDconfig.retrieveRCMDconfig', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from RCMDconfig!');

		let config = vscode.workspace.getConfiguration("R.CMD.config");

		let cppflags = execSync("R CMD config --cppflags", { encoding: "utf-8" });
		cppflags = cppflags.trim();
		config.update("cppflags", cppflags, true);

		let ldflags = execSync("R CMD config --ldflags", { encoding: "utf-8" });
		ldflags = ldflags.trim();
		config.update("ldflags", ldflags, true);

		let r_tools_soft = execSync("R CMD config R_TOOLS_SOFT", { encoding: "utf-8" });
		r_tools_soft = r_tools_soft.trim();
		config.update("r_tools_soft", r_tools_soft, true);

		let r_home = execSync(`R --silent --no-echo -e "cat(R.home())"`, { encoding: "utf-8" });
		r_home = r_home.trim();
		config.update("R_HOME", r_home, true);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
