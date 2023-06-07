export default function destructureDatas(datas, sortProperty) {
    if (datas && datas.length != 0) {
        let datasHolder = []
        datas.docs.forEach((userDoc, index) => {
            let dataHolder = {}
            let object = userDoc._document.data.value.mapValue.fields
            let keys = Object.keys(object)
            keys.forEach((key) => dataHolder[key] = object[key].stringValue)
            dataHolder.id = userDoc.id
            dataHolder.creationDate = new Date(userDoc._document.createTime.timestamp.seconds)
            datasHolder.push(dataHolder)
        });
        if (sortProperty) datasHolder = datasHolder.sort((a, b) => b[sortProperty] - a[sortProperty])
        return datasHolder
    }
}