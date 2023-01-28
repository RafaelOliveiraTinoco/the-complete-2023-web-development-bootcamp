import Debug "mo:base/Debug";

actor DBank {

	var money = 500;

	public func topUp(amount: Nat){
		money += amount;
		Debug.print(debug_show(money));
	};

	public func withdraw(amount: Nat){
		let tempMoney: Int = money - amount;
		if (tempMoney >= 0){
			money -= amount;
			Debug.print(debug_show(money));

		}else{
			Debug.print("Could not withdraw due to insufficient money.");
		}
	};

	public query func checkBalance(): async Nat{
		return money;
	}

}
