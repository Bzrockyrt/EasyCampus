export default function destructureData(data) {
    if (data._document) {
        let dataHolder = {}
        let object = data._document.data.value.mapValue.fields
        let keys = Object.keys(object)
        keys.forEach((key) => {
            if (object[key].arrayValue) {
                dataHolder[key] = object[key].arrayValue.values?.map((value) => value.stringValue)
            }
            if (object[key].integerValue) {
                dataHolder[key] = Number(object[key].integerValue)
            }
            if (object[key].stringValue) {
                dataHolder[key] = object[key].stringValue
            }
            if (object[key].timestampValue) {
                dataHolder[key] = object[key].timestampValue
            }
        })
        dataHolder.id = data.id
        return dataHolder
    }
}