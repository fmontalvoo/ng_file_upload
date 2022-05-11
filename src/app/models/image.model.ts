export class ImageModel {
    private _file!: File;
    private _fileName!: string;
    private _url!: string;
    private _isUploading!: boolean;
    private _progress!: number;

    constructor(file: File) {
        this._file = file;
        this._fileName = file.name;
        this._isUploading = false;
        this._progress = 0;
    }

    set file(file: File) {
        this.file = file;
    }
    get file(): File {
        return this._file;
    }

    set fileName(fileName: string) {
        this._fileName = fileName;
    }
    get fileName(): string {
        return this._fileName;
    }

    set url(url: string) {
        this._url = url;
    }
    get url(): string {
        return this._url;
    }

    set isUploading(isUploading: boolean) {
        this._isUploading = isUploading;
    }
    get isUploading(): boolean {
        return this._isUploading;
    }

    set progress(progress: number) {
        this._progress = progress;
    }
    get progress(): number {
        return this._progress;
    }

}

export interface Image {
    name: string;
    url: string;
}