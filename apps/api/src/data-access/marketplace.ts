import {
	db,
	eq,
	prefrencesTable,
	profileBookmarks,
	project_users,
	projectsTable,
} from "@repo/db";
import { aliasedTable, and, sql } from "drizzle-orm";
import { getRandomId } from "../lib/utils";

import { error } from "node:console";
import type { Prefrences } from "../validations/types";

export async function get_profile_preferences(profile_id: string) {
	/*
        excute a qeury that returns the prefrences based on profile_id 
    */
	const prefrences = await db.query.prefrencesTable.findFirst({
		where: eq(prefrencesTable.id, profile_id),
	});
	return prefrences;
}

export async function applyToProject(profile_id: string, project_id: string) {
	try {
		const result = await db.insert(project_users).values({
			id: getRandomId(),
			profile_id: profile_id,
			project_id: project_id,
		});

		console.log("applying done successfully ");
	} catch (error) {
		console.error("Error occured when applying to project :", error);
		throw new Error("Unable to apply to the project ");
	}
}

export async function filterProjects(prefrences: Prefrences) {
	const aliasedProjectTable = aliasedTable(projectsTable, "projects");

	const result = await db
		.select()
		.from(aliasedProjectTable)
		.where(
			sql`${aliasedProjectTable.tech_stack} && ${sql`array[${prefrences.techstack.map((tech) => sql`${tech}`)}]`}`,
		);

	return result;
}

export async function getBookmarks(profile_id: string) {
	const result = await db
		.select()
		.from(profileBookmarks)
		.where(eq(profileBookmarks.profile_id, profile_id));

	return result;
}

export async function addToBookmarks(
	inserted_profile_id: string,
	inserted_project_id: string,
) {
	try {
		const result = await db.insert(profileBookmarks).values({
			profile_id: inserted_profile_id,
			project_id: inserted_project_id,
		});

		return result;
	} catch (error) {
		console.error("Error adding to bookmarks:", error);
		throw new Error("Unable to add to bookmarks");
	}
}

export async function deleteFromBookmark(
	inserted_profile_id: string,
	deleted_project_id: string,
) {
	try {
		const result = await db
			.delete(profileBookmarks)
			.where(
				and(
					eq(profileBookmarks.profile_id, inserted_profile_id),
					eq(profileBookmarks.project_id, deleted_project_id),
				),
			);

		return result;
	} catch (erro) {
		console.error("error deleting bookmarks ", error);
		throw new Error("unabel to delete bookmarks ");
	}
}
