/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wue86eqgce14hqt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "exiejccy",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wue86eqgce14hqt")

  // remove
  collection.schema.removeField("exiejccy")

  return dao.saveCollection(collection)
})
