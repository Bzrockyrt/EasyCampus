export default function destructureData(data) {
    if (data) {
        let dataHolder = {}
        let object = data._document.data.value.mapValue.fields
        let keys = Object.keys(object)
        keys.forEach((key) => dataHolder[key] = object[key].stringValue)
        dataHolder.id = data.id
        return dataHolder
    }
}