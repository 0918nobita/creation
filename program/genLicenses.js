const compareVersions = require('compare-versions');
const licensesJson = require('./licenses.json');

const packages = {};

{
    const versions = new Map();

    for (const key in licensesJson) {
        const matchResult = key.match(/^(.+)@(.+)$/);
        if (!matchResult) continue;
        const name = matchResult[1];
        const version = matchResult[2];

        if (!versions.has(name)) {
            packages[key] = licensesJson[key];
            versions.set(name, version);
        } else if (compareVersions(versions.get(name), version) < 1) {
            // 重複した名前のパッケージの場合、最新バージョンのみ含める
            delete packages[`${name}@${versions.get(name)}`];
            versions.set(name, version);
        }
    }
}

for (const key in packages) {
    console.log(`${key}: ${packages[key].licenses}`);
}
