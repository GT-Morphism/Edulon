/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wue86eqgce14hqt",
    "created": "2024-07-18 21:37:51.971Z",
    "updated": "2024-07-18 21:37:51.971Z",
    "name": "Lecture",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yluowalm",
        "name": "Name",
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
        "id": "ffkeocbf",
        "name": "Year",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("wue86eqgce14hqt");

  return dao.deleteCollection(collection);
})
