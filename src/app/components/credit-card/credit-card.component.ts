import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  cardList: any[] = [];
  action = 'Add';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _cardService : CardService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      CVV: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){ 
    this._cardService.getCardList().subscribe(data => {
      console.log(data);
      this.cardList = data;
    }, error => {
      console.log(error);
    })
      
  }

  saveCard(){

    const card: any = {
      name: this.form.get('name')?.value,
      number: this.form.get('number')?.value,
      expDate: this.form.get('expDate')?.value, 
      CVV: this.form.get('CVV')?.value,
    }

    if(this.id === undefined) {
      //add a new card
      this._cardService.saveCard(card).subscribe(data =>{
        this.toastr.success('Card succesfully added!', 'Card registered');
        this.getCards();
        this.form.reset();
      }, 
      error =>{
        this.toastr.error('An unexpected error occurred', 'Error');
        console.log(error);
      })
    }
    else {
      card.id = this.id;
      //edit existent card
      this._cardService.updateCard(this.id, card).subscribe(data =>{
        this.form.reset();
        this.action = 'add';
        this.id = undefined;
        this.toastr.info('Card succesfully updated!', 'Card updated');
        this.getCards();
      }, error => {
        console.log(error);
      })
    }



  } 

  deleteCard(id: number) {
    this._cardService.deleteCard(id).subscribe(data =>{
      this.toastr.error('Card succesfully deleted', 'Card deleted');
      this.getCards();
    },
    error =>{
      console.log(error);
    });
  }

  editCard(card: any){
    this.action = 'edit';
    this.id = card.id;

    this.form.patchValue({
      name: card.name,
      number: card.number,
      expDate: card.expDate,
      CVV: card.cvv
    })
  }

}
