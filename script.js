const zipFile = document.getElementById("zipFile");
const iconFile = document.getElementById("iconFile");

const fileName = document.getElementById("fileName");
const iconName = document.getElementById("iconName");

const buildBtn = document.getElementById("buildBtn");
const status = document.getElementById("status");

zipFile.addEventListener("change", () => {

    if (zipFile.files.length > 0) {
        fileName.textContent = zipFile.files[0].name;
    } else {
        fileName.textContent = "Choose ZIP file";
    }

});

iconFile.addEventListener("change", () => {

    if (iconFile.files.length > 0) {
        iconName.textContent = iconFile.files[0].name;
    } else {
        iconName.textContent = "Choose icon";
    }

});

buildBtn.addEventListener("click", () => {

    const appName =
        document.getElementById("appName").value.trim();

    const packageName =
        document.getElementById("packageName").value.trim();

    const versionName =
        document.getElementById("versionName").value.trim();

    if (!appName) {
        status.textContent = "❌ App Name required.";
        return;
    }

    if (!packageName) {
        status.textContent = "❌ Package Name required.";
        return;
    }

    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(packageName)) {
        status.textContent =
            "❌ Invalid package name. Example: com.example.myapp";
        return;
    }

    if (!versionName) {
        status.textContent = "❌ Version required.";
        return;
    }

    status.textContent =
        "✅ Settings ready. GitHub Actions will build the APK.";

    console.log({
        appName: appName,
        packageName: packageName,
        versionName: versionName,
        zip: zipFile.files[0] || null,
        icon: iconFile.files[0] || null
    });

});