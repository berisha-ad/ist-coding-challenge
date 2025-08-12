import fs from "fs";
export const readAppConfiguration = (file) => {
    const configuration = JSON.parse(fs.readFileSync(file, "utf-8"));
    return configuration;
};
//# sourceMappingURL=ConfigurationModel.js.map