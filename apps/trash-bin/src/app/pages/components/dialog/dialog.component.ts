import { Component } from '@angular/core';
import { DialogComponent } from '@trash-bin/ui/dialog';
import { CodeComponent } from '../code/code.component';
import { ButtonComponent } from '@trash-bin/ui/button';
import { FormsModule } from '@angular/forms';
import { TabsComponent, TabPanelComponent } from '../../../../lib/tabs/tabs.component';

@Component({
  selector: 'app-dialog-docs',
  standalone: true,
  imports: [DialogComponent, CodeComponent, ButtonComponent, FormsModule, TabsComponent, TabPanelComponent],
  template: `
    <div class="prose dark:prose-invert">
      <h1 class="text-4xl font-bold mb-6">Dialog Component</h1>
      <p>
        The Dialog component provides a modal dialog that can be used to display
        content or collect user input.
      </p>

      <h2>Examples</h2>
      <div class="space-y-8">
        <div class="space-y-4">
          <h3>Basic Usage</h3>
          <app-tabs [tabs]="basicTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-button (click)="openBasicDialog()">Open Dialog</lib-button>
                  <lib-dialog [(open)]="isBasicDialogOpen" title="Basic Dialog">
                    <p dialogContent>This is a basic dialog example.</p>
                    <div dialogFooter class="flex justify-end gap-2">
                      <lib-button
                        variant="secondary"
                        (click)="isBasicDialogOpen = false"
                        >Cancel</lib-button
                      >
                      <lib-button (click)="isBasicDialogOpen = false"
                        >Confirm</lib-button
                      >
                    </div>
                  </lib-dialog>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code [code]="basicCode" [language]="'html'"> </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>

        <div class="space-y-4">
          <h3>Dialog with Form</h3>
          <app-tabs [tabs]="formTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-button (click)="openFormDialog()">Open Form Dialog</lib-button>
                  <lib-dialog [(open)]="isFormDialogOpen" title="Form Dialog">
                    <form (ngSubmit)="onSubmit()" class="space-y-4" dialogContent>
                      <div>
                        <label for="name" class="block text-sm font-medium"
                          >Name</label
                        >
                        <input
                          type="text"
                          id="name"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label for="email" class="block text-sm font-medium"
                          >Email</label
                        >
                        <input
                          type="email"
                          id="email"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                    </form>
                    <div dialogFooter class="flex justify-end gap-2">
                      <lib-button
                        variant="secondary"
                        (click)="isFormDialogOpen = false"
                        >Cancel</lib-button
                      >
                      <lib-button type="submit" (click)="onSubmit()"
                        >Submit</lib-button
                      >
                    </div>
                  </lib-dialog>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code [code]="formCode" [language]="'html'"> </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>

        <div class="space-y-4">
          <h3>Dialog with Backdrop Click</h3>
          <app-tabs [tabs]="backdropTabs">
            <app-tab-panel id="preview">
              <div class="p-4">
                <div class="flex gap-4 items-center">
                  <lib-button (click)="openBackdropDialog()">Open Dialog</lib-button>
                  <lib-dialog [(open)]="isBackdropDialogOpen" title="Backdrop Dialog" [closeOnBackdropClick]="true">
                    <p dialogContent>This dialog can be closed by clicking outside.</p>
                    <div dialogFooter class="flex justify-end gap-2">
                      <lib-button
                        variant="secondary"
                        (click)="isBackdropDialogOpen = false"
                        >Close</lib-button
                      >
                    </div>
                  </lib-dialog>
                </div>
              </div>
            </app-tab-panel>
            <app-tab-panel id="code">
              <app-code [code]="backdropCode" [language]="'html'"> </app-code>
            </app-tab-panel>
          </app-tabs>
        </div>
      </div>
    </div>
  `,
})
export class DialogDocsComponent {
  isBasicDialogOpen = false;
  isFormDialogOpen = false;
  isBackdropDialogOpen = false;

  basicTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  formTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  backdropTabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  openBasicDialog() {
    this.isBasicDialogOpen = true;
  }

  openFormDialog() {
    this.isFormDialogOpen = true;
  }

  openBackdropDialog() {
    this.isBackdropDialogOpen = true;
  }

  onSubmit() {
    // Handle form submission
    this.isFormDialogOpen = false;
  }

  basicCode = `<lib-button (click)="openBasicDialog()">Open Dialog</lib-button>
<lib-dialog [(open)]="isBasicDialogOpen" title="Basic Dialog">
  <p dialogContent>This is a basic dialog example.</p>
  <div dialogFooter class="flex justify-end gap-2">
    <lib-button
      variant="secondary"
      (click)="isBasicDialogOpen = false"
      >Cancel</lib-button
    >
    <lib-button (click)="isBasicDialogOpen = false"
      >Confirm</lib-button
    >
  </div>
</lib-dialog>`;

  formCode = `<lib-button (click)="openFormDialog()">Open Form Dialog</lib-button>
<lib-dialog [(open)]="isFormDialogOpen" title="Form Dialog">
  <form (ngSubmit)="onSubmit()" class="space-y-4" dialogContent>
    <div>
      <label for="name" class="block text-sm font-medium">Name</label>
      <input
        type="text"
        id="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium">Email</label>
      <input
        type="email"
        id="email"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  </form>
  <div dialogFooter class="flex justify-end gap-2">
    <lib-button
      variant="secondary"
      (click)="isFormDialogOpen = false"
      >Cancel</lib-button
    >
    <lib-button type="submit" (click)="onSubmit()"
      >Submit</lib-button
    >
  </div>
</lib-dialog>`;

  backdropCode = `<lib-button (click)="openBackdropDialog()">Open Dialog</lib-button>
<lib-dialog [(open)]="isBackdropDialogOpen" title="Backdrop Dialog" [closeOnBackdropClick]="true">
  <p dialogContent>This dialog can be closed by clicking outside.</p>
  <div dialogFooter class="flex justify-end gap-2">
    <lib-button
      variant="secondary"
      (click)="isBackdropDialogOpen = false"
      >Close</lib-button
    >
  </div>
</lib-dialog>`;
}
