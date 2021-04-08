import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetails';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentals:RentalDetail[]
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals(){
    this.rentalService.getRentalDetails().subscribe(response=>{
      this.rentals=response.data
    })
    }
  }


