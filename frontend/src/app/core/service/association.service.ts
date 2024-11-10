import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAssociation} from '../models/IAssociation';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  // httpClient: HttpClient;
  //
  // constructor(httpClient: HttpClient) {
  //   this.httpClient = httpClient;
  // }
  //
  // getAllAssociations(): Observable<IAssociation[]> {
  //   const url = 'http://localhost:3000/api/v1/association';
  //   return this.httpClient.get<IAssociation[]>(url);
  // }

  private apiUrl = 'http://localhost:3000/api/v1/association';
  associations = signal<IAssociation[]>([]); // Initialwert ist ein leeres Array
  loading = signal<boolean>(false);

  // Daten holen und das Signal aktualisieren
  getAllAssociations() {
    this.loading.set(true); // Ladezustand aktivieren

    fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
        return response.json();
      })
      .then((data: IAssociation[]) => {
        this.associations.set(data); // Setze die Daten
      })
      .catch((error) => console.error(error))
      .finally(() => this.loading.set(false));
  }
}
