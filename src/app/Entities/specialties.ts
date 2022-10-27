export class SpecialtiesC {
    public list = new Array();
    
    public constructor() {
        this.list.push('Odontología');
        this.list.push('Pediatría');
        this.list.push('Traumatología');
    }

    public setNewSpecialty(spe: string){
        this.list.push(spe);
    }

    public getSpecialtiesList(){
        return this.list;
    }
}
