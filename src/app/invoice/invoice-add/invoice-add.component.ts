import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/service/invoice.service';
import Swal from 'sweetalert2';
import { Invoice } from '../invoice';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent {
  constructor(private builder: FormBuilder, private invoiceService: InvoiceService, 
    private router: Router) { }

    invoiceForm: FormGroup = this.builder.group({
      item: this.builder.control('', Validators.required),
      price: this.builder.control('', Validators.required),
      qty: this.builder.control('', Validators.required),
      description: this.builder.control('', Validators.required),
      ordered_date: new Date().toLocaleDateString('en-GB'),
      address: this.builder.control('', Validators.required)
    });

  submitAddInvoice() {
    if(this.invoiceForm.valid) {
      this.getLastId().then(id => {
      let invoice: Invoice = {
        id: id,
        item: this.invoiceForm.value.item,
        description: this.invoiceForm.value.description,
        price: this.invoiceForm.value.price,
        qty: this.invoiceForm.value.qty,
        address: this.invoiceForm.value.address,
        orderedDate: this.invoiceForm.value.ordered_date
      };
      this.invoiceService.addInvoice(invoice).then(
          invoice => {
            Swal.fire({
              icon: 'success',
              title: 'Invoice added successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['invoices']);
        })
    });
    //console.log("id: " + lastId)
    
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter valid data!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  async getLastId(): Promise<number>{
    //let invoices: Invoice[] = [];
    let id: number = 0;
    const invoices = await this.invoiceService.getAllInvoices();
    invoices.forEach(invoice => {
      if(invoice.id > id) {
        id = invoice.id;
      }
    });
    return Promise.resolve(id + 1);
 }

}
