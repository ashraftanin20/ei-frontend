import { Component, inject } from '@angular/core';
import { Invoice } from '../invoice';
import { InvoiceService } from '../../service/invoice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {

  count: number = 0;
  invoices: Invoice[] = [];
  invoice: Invoice | undefined;
  page = 1;
  pageSize = 5;
  dateFormat = new DatePipe('shortDate');
  
  invoiceService: InvoiceService = inject(InvoiceService);
  constructor(private router: Router) {
    this.invoiceService.getAllInvoices().then(
      (invoices: Invoice[]) => {
        this.invoices = invoices;
      }
    );
  }

  removeInvoice(invoiceId: number) {
    Swal.fire({
        'icon': 'warning',
        'title': "Are you sure you want to delete the order?",
        'showConfirmButton': true,
        'timer': 2000
    }).then(
      confirm => {
        this.invoiceService.removeInvoice(invoiceId).then(
          (invoice) => {
            this.invoice = invoice;
          }
        )
        if(this.invoice) {
          Swal.fire({
            icon: 'success',
            title: 'Invoice removed successfully',
            timer: 1500
          })
          this.router.navigate(['invoices']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cannot remove the invoice',
          timer: 1500
        });
        return this.invoice;
      }
    }
    )     
  }

  printList() {
    window.print();
  }
}