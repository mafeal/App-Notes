class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada.')
    }
    // static - permite acesso ao método da classe sem instanciá-la com um "new".
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}h`
    }
}