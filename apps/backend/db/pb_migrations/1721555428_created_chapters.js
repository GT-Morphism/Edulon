/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dqknq8p2h4k72pb",
    "created": "2024-07-21 09:50:28.837Z",
    "updated": "2024-07-21 09:50:28.837Z",
    "name": "chapters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ad2vhlmr",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7teb1zcc",
        "name": "summary",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dqknq8p2h4k72pb");

  return dao.deleteCollection(collection);
})
