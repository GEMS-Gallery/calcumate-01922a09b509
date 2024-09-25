import Float "mo:base/Float";

actor Calculator {
  // Addition
  public query func add(x : Float, y : Float) : async Float {
    x + y
  };

  // Subtraction
  public query func subtract(x : Float, y : Float) : async Float {
    x - y
  };

  // Multiplication
  public query func multiply(x : Float, y : Float) : async Float {
    x * y
  };

  // Division
  public query func divide(x : Float, y : Float) : async ?Float {
    if (y == 0) {
      null // Return null for division by zero
    } else {
      ?(x / y)
    }
  };
}
