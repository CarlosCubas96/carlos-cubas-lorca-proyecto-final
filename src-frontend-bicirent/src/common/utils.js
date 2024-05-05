class Utils {
    static capitalize(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}

export default Utils;
