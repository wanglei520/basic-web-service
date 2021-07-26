class Person {
  public Name: string;
  public Age: number = 0;
  constructor(name: string) {
    this.Name = name;
  }
  private check(){
    
  }
  public Say(message: string) {
    console.log(message);
  }
}
