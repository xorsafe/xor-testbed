import { Activity, Bundle } from "src/app/core/model/schedule";
import { hslToRgbColor } from "./shell-mocks";
import { faker } from "@faker-js/faker";
import { Tag } from "src/app/core/model/base";
import { Journal, JournalEntry } from "src/app/core/model/journal";

export function fromNamesToBundles(onlyNames:string[]):Bundle[]{

	return onlyNames.map((v:any,i:number)=>{
		const bundle = new Bundle(
			v,
			`Mock Description for #Bundle ${i}`,
			hslToRgbColor(faker.number.int({min:0,max:360}),40,50)
			)

		bundle.rank = i;
		return bundle;
	})
}

export function fromNamesToTags(onlyNames:string[]):Tag[]{

	return onlyNames.map((v:any,i:number)=>{
		const tag = new Tag(
			v,
			`Mock Description for #Tag ${i}`,
			hslToRgbColor(faker.number.int({min:0,max:360}),40,50)
			)

		return tag;
	})
}

export function fromNamesToActivities(onlyNames:string[]):Activity[]{

	return onlyNames.map((v:any,i:number)=>{
		const activity = new Activity(
			v,
			`Mock Description for #Tag ${i}`,
			hslToRgbColor(faker.number.int({min:0,max:360}),40,50)
			)

		return activity;
	})
}

export function journalEntries(notesOnly:string[]):JournalEntry[]{
	return notesOnly.map((v:string,i:number)=>{
		const journalEntry = new JournalEntry(
			v,
			faker.date.anytime({
				refDate:faker.date.recent({days:3})
			})
		)

		return journalEntry;
	})
}