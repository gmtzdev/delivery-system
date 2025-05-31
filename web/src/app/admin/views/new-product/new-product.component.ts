import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { MenuItem, MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { Badge } from 'primeng/badge';
import { CommonModule } from '@angular/common';
// import { ToastModule } from 'primeng/toast';
import { ToastModule } from 'primeng/toast'
import { InputNumberModule } from 'primeng/inputnumber';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-new-product',
  imports: [
    InputTextModule, EditorModule, FileUploadModule, SelectModule, 
    TagModule, ToggleSwitchModule, ButtonModule, ProgressBar,
    Badge, CommonModule, ToastModule, InputNumberModule
  ],
  providers: [MessageService],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit{
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly breadcrumbService: BreadcrumbService = inject(BreadcrumbService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly config: PrimeNG = this.environmentInjector.get(PrimeNG);

  onUpload(event: UploadEvent) {
    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  ngOnInit(): void {
    const items: MenuItem[] = [{ label: 'Products' }, { label: 'New', route: '/admin/new-product'}]
    this.breadcrumbService.updateBCEmmiter.emit(items);
  }


  files: File[] = [];
  totalSize : number = 0;
  totalSizePercent : number = 0;



    choose(event:any, callback:any) {
        callback();
    }

    onRemoveTemplatingFile(event:any, file:any, removeFileCallback:any, index:number) {
        removeFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalSizePercent = this.totalSize / 10;
    }

    onClearTemplatingUpload(clear:any) {
        clear();
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }

    onTemplatedUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    onSelectedFiles(event:any) {
        this.files = event.currentFiles;
        this.files.forEach((file) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalSizePercent = this.totalSize / 10;
    }

    uploadEvent(callback:any) {
        callback();
    }

    formatSize(bytes: number):string {
        const k = 1024;
        const dm = 3;
        const sizes = this.config.translation.fileSizeTypes;
        if(!sizes) return '';
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }
}
