import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RawMaterial } from 'src/app/schema/interfaces/rawMaterials.interface';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/modules/shared/services/shared.service';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.component.html',
  styleUrls: ['./raw-materials.component.scss']
})
export class RawMaterialsComponent implements OnInit {
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  fetching = true;
  showError = false;
  errorMsg = null;
  rawMaterialsList: RawMaterial[] = [];
  displayedColumns: string[] = ['index', 'code', 'name', 'stock', 'holdCount', 'created', 'updated'];
  cleanTurnings = 0;
  solidTunrings = 0;
  commercial = 0;
  iron = 0;
  constructor(private apiService: ApiService, private dialog: MatDialog,
    private sharedService: SharedService) { }

  ngOnInit(): void {

    this.fetchRawMaterials();
  }
  fetchRawMaterials() {
    this.apiService.getRawMaterials().subscribe((res: any) => {
      this.rawMaterialsList = res.rawMaterials;
      this.cleanTurnings = +this.rawMaterialsList[0].stockCount;
      this.solidTunrings = +this.rawMaterialsList[1].stockCount;
      this.commercial = +this.rawMaterialsList[2].stockCount;
      this.iron = +this.rawMaterialsList[3].stockCount;
      this.fetching = false;
      console.log("prodd", this.rawMaterialsList)

    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.showError = true;
      this.errorMsg = "Something went wrong! please try again!"
    })
  }
  showDialog() {
    const dialogRef = this.dialog.open(this.updateTemplate, {
      width: '800px',
      height: '500px',
      disableClose: true,
    });

  }
  updateInventory() {
    this.dialog.closeAll();
    this.fetching = true;
    const payload = [
      this.cleanTurnings,
      this.solidTunrings,
      this.commercial,
      this.iron
    ]
    this.apiService.updateRawMaterials(payload).subscribe((res) => {
      this.fetchRawMaterials();
      this.sharedService.showSuccess("Raw materials updated successfully!")
    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.showError = true;
      this.errorMsg = "Upate failed! please try again!"
    })
    console.log('Dialog was closed');
  }
  close() {
    this.dialog.closeAll();
  }
}
