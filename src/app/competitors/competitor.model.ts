export class Competitor {

  public id: string;

  constructor(
    public firstname: string,
    public lastname: string,
    public category: string,
    public results: {description: string, year: number}[],
    public pictureRef: string,
    ) {this.id = this.firstname.toLowerCase()+ this.lastname.toLowerCase(); }

}
