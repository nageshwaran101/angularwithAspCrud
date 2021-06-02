import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  datas: any[] = [];
  constructor(private dataService: DataService, private router: Router) {
    this.fetch();
  }

  ngOnInit() {
    
  }
  fetch() {
    this.dataService.getTableData().subscribe((data: any[]) => {
      this.datas = data;
    })
  }
  delete(id: any) {
    this.dataService.deleteData(id).subscribe((data: any) => {
      this.fetch();
    })
  }
  edit(id:any) {
    this.router.navigate(['form/'+id]);
  }
}
