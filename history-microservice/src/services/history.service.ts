import {HistoryEntity} from "../entities/history.entity"
import {myDataSource} from "../../data-source.js";

// Create a record in the history
export async function Create(record: any) {
    const history = new HistoryEntity();
    history.profileId = record.profileId;
    history.songId =record.songId;
    return await myDataSource.getRepository(HistoryEntity).save(history);
}

// Find all recorded history for a profile
export function GetAll(profileId: any) {
    return myDataSource.getRepository(HistoryEntity).findBy({profileId: profileId});
}

// Delete all recorded history for a profile
export async function DeleteAll(profileId: any) {
    let records: HistoryEntity[] = await myDataSource.getRepository(HistoryEntity).findBy({profileId: profileId});
    return myDataSource.getRepository(HistoryEntity).remove(records);
}