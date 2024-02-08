import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { groupBySizes, groupBySizesAndName } from 'src/app/helper/helper';
import { FeTiProduct } from 'src/app/schema/interfaces/products.interface';
import { ApiService } from 'src/app/services/api.service';
import { SizeChart } from 'src/modules/shared/app.constants';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  fetching = true;
  showError = false;
  errorMsg = null;
  productList: FeTiProduct[] = [];
  sizeChart = SizeChart
  parsedList: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((res: any) => {
      this.productList = res.FeTi;
      this.parsedList = groupBySizesAndName(this.productList);
      this.fetching = false;
      console.log("goruped", groupBySizes(this.productList))
      console.log("groupBySizesAndSubgrades", groupBySizesAndName(this.productList))
      console.log("prodd", this.productList)

    }, (error: HttpErrorResponse) => {
      console.error('error: ', error);
      this.fetching = false;
      this.showError = true;
      this.errorMsg = "Something went wrong! please try again!"
    })

  }
  getRowCount(subValue: any[], name: string): number {
    let count = 0;
    for (const subrow of subValue) {
      if (subrow.name === name) {
        count++;
      } else {
        break; // Exit loop once different name encountered
      }
    }
    return count;
  }

}
