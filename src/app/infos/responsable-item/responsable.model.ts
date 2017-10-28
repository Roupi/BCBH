export class Responsable{

  public id: string;

  constructor(
  public firstname: string,
  public lastname: string,
  public history: {description: string}[],
  public functions: {description: string}[],
  public pictureRef: string,
  ){this.id = this.firstname.toLowerCase() + this.lastname.toLowerCase(); }

}
