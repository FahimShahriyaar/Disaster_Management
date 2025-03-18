import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }

  role=signal(localStorage.getItem('role')??'anonymous')
  profile=signal(localStorage.getItem('profile')??null)
  crisis_modal=signal(false)
  selected_volunteer=signal(null)

  TotalFund(){
    return this.http.get<any>('http://localhost:3000/api/fund')
  }

  TotalExpense(){
    return this.http.get<any>('http://localhost:3000/api/expense')
  }

  DonationsListFull(){
    return this.http.get<any>('http://localhost:3000/api/donation')
  }
  DonationsListPartial(page,limit){
    return this.http.get<any>(`http://localhost:3000/api/donation/page/${page}/limit/${limit}`)
  }
  DonationCreate(data){
    return this.http.post<any>('http://localhost:3000/api/donation',data)
  }

  CrisiesListFull(){
    return this.http.get<any>('http://localhost:3000/api/crisis')
  }
  CrisiesListPartial(page,limit,filter=''){
    return this.http.get<any>(`http://localhost:3000/api/crisis/page/${page}/limit/${limit}?filter=${filter}`)
  }
  CrisisCreate(data){
    return this.http.post<any>(`http://localhost:3000/api/crisis`,data)
  }
  CrisisUpdate(data){
    return this.http.put<any>(`http://localhost:3000/api/crisis`,data)
  }
  CrisisDelete(data){
    return this.http.delete<any>(`http://localhost:3000/api/crisis/${data}`)
  }

  VolunteersListFull(){
    return this.http.get<any>('http://localhost:3000/api/volunteer')
  }
  VolunteersListPartial(page,limit,filter=''){
    return this.http.get<any>(`http://localhost:3000/api/volunteer/page/${page}/limit/${limit}?filter=${filter}`)
  }
  VolunteersTaskAssign(data){
    return this.http.put<any>(`http://localhost:3000/api/volunteer`,data)
  }


  InventoryListFull(){
    return this.http.get<any>('http://localhost:3000/api/inventory')
  }
  InventoryListPartial(page,limit,filter=''){
    return this.http.get<any>(`http://localhost:3000/api/inventory/page/${page}/limit/${limit}?filter=${filter}`)
  }
  InventoryCreate(data){
    return this.http.post<any>(`http://localhost:3000/api/inventory`,data)
  }
  InventoryUpdate(data){
    return this.http.put<any>(`http://localhost:3000/api/inventory`,data)
  }
  InventoryDelete(id){
    return this.http.delete<any>(`http://localhost:3000/api/inventory/${id}`)
  }



  Login(data:any){
    return this.http.post<any>('http://localhost:3000/api/account/login',data)
  }

}
