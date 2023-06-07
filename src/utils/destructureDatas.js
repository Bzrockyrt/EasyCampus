export default function destructureDatas(datas) {
    if (datas) {
        const datasHolder = []
        datas.docs.forEach((userDoc, index) => {
            let dataHolder = {}
            let object = userDoc._document.data.value.mapValue.fields
            let keys = Object.keys(object)
            keys.forEach((key) => dataHolder[key] = object[key].stringValue)
            dataHolder.id = userDoc.id
            datasHolder.push(dataHolder)
        });
        return datasHolder
    }
}