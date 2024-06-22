/**
 * Describes a testbed and embeds both presentational data like name/description and
 * a list of case studies that apply on the component. Make sure to give the testbed
 * a unique id so that it can be matched with the correct component
 */
export class TestbedModel{

    constructor(private _name:string,private _description:string,private _themesSupported=['light']){ 
    }

    private _currentThemeIndex:number = 0;

	caseStudies!: ICaseStudy[];

    private _selectedCaseStudyIndex:number =0;

    get name():string{
        return this._name;
    }

    get description():string{
        return this._description;
    }

    set selectedCaseStudyIndex(index:number){
        if(index < 0 || index >= this.caseStudies.length){
            return ;
        }

        this._selectedCaseStudyIndex = index;
    }

    get selectedCaseStudyIndex():number{
        return this._selectedCaseStudyIndex;
    }

    get selectedCaseStudy():ICaseStudy{
        return this.caseStudies[this.selectedCaseStudyIndex];
    }

    get themesSupported():string[]{
        return this._themesSupported;
    }

    get currentTheme():string{
        return this.themesSupported[this._currentThemeIndex];
    }

    set currentThemeIndex(index:number){
        if(index < 0 || index >= this.themesSupported.length){
            return;
        }

        this._currentThemeIndex = index;
    }
}


/** Describes a case that appears in a testbed */
export interface ICaseStudy {
	name: string;
	description: string;
	data: any;
}