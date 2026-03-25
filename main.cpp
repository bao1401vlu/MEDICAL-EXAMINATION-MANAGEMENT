#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>
#include <iomanip>
#include <cstdlib>

using namespace std;

void clearConsole() {
    #ifdef _WIN32
        system("cls");
    #else
        system("clear");
    #endif
}

void pauseMenu() {
    cout << "\nPress Enter to continue...";
    cin.get();
    clearConsole();
}

class Patient {
private:
    string id, name, phone, dob, bloodType, allergies, diagnosis, prescriptions;

public:
    Patient(string id, string name, string phone, string dob, string blood, string allergies, string diagnosis, string meds) {
        this->id = id; this->name = name; this->phone = phone; this->dob = dob;
        this->bloodType = blood; this->allergies = allergies; this->diagnosis = diagnosis; this->prescriptions = meds;
    }

    string getId() const { return id; }
    string getName() const { return name; }
    string getPhone() const { return phone; }
    string getDob() const { return dob; }
    string getBloodType() const { return bloodType; }
    string getAllergies() const { return allergies; }
    string getDiagnosis() const { return diagnosis; }
    string getPrescriptions() const { return prescriptions; }

    void setPhone(string val) { phone = val; }
    void setDiagnosis(string val) { diagnosis = val; }
    void setPrescriptions(string val) { prescriptions = val; }

    string toFormat() const {
        return id + "|" + name + "|" + phone + "|" + dob + "|" + bloodType + "|" + allergies + "|" + diagnosis + "|" + prescriptions;
    }
};

class ClinicSystem {
private:
    vector<Patient> patients;
    const string filename = "patients_data.txt";

    string generateId() {
        if (patients.empty()) return "1001";
        int lastId = stoi(patients.back().getId());
        return to_string(lastId + 1);
    }

    string promptInput(string promptText) {
        string input;
        while (true) {
            cout << promptText;
            getline(cin, input);

            bool valid = false;
            for (char c : input) {
                if (c != ' ') {
                    valid = true;
                    break;
                }
            }

            if (valid) return input;
            cout << "  -> This field is required. Please enter a value.\n";
        }
    }

public:
    ClinicSystem() { loadData(); }

    void loadData() {
        patients.clear();
        ifstream file(filename);
        string line;
        while (getline(file, line)) {
            stringstream ss(line);
            string id, name, phone, dob, blood, alg, diag, meds;
            getline(ss, id, '|'); getline(ss, name, '|'); getline(ss, phone, '|');
            getline(ss, dob, '|'); getline(ss, blood, '|'); getline(ss, alg, '|');
            getline(ss, diag, '|'); getline(ss, meds, '|');
            if (!id.empty()) {
                patients.push_back(Patient(id, name, phone, dob, blood, alg, diag, meds));
            }
        }
        file.close();
    }

    void saveData() {
        ofstream file(filename);
        for (const auto& p : patients) { file << p.toFormat() << "\n"; }
        file.close();
    }

    void addPatient() {
        clearConsole();
        cout << "=== Add New Patient ===\n";
        
        string name = promptInput("Name: ");
        string phone = promptInput("Phone: ");
        string dob = promptInput("DOB (DD/MM/YYYY): ");
        string blood = promptInput("Blood Type: ");
        string alg = promptInput("Allergies (or 'None'): ");
        string diag = promptInput("Diagnosis (or 'N/A'): ");
        string meds = promptInput("Medications (or 'N/A'): ");

        Patient newPatient(generateId(), name, phone, dob, blood, alg, diag, meds);
        patients.push_back(newPatient);
        saveData();
        
        cout << "\nPatient successfully added. ID assigned: " << newPatient.getId() << "\n";
        pauseMenu();
    }

    void viewPatients() {
        clearConsole();
        cout << "=== Patient List ===\n";
        if (patients.empty()) {
            cout << "No records found.\n";
        } else {
            cout << left << setw(6) << "ID" << setw(20) << "Name" << setw(15) << "Phone" << "Diagnosis\n";
            cout << string(60, '-') << "\n";
            for (const auto& p : patients) {
                cout << left << setw(6) << p.getId() << setw(20) << p.getName() 
                     << setw(15) << p.getPhone() << p.getDiagnosis() << "\n";
            }
        }
        pauseMenu();
    }

    void searchPatient() {
        clearConsole();
        cout << "=== Search Patient ===\n";
        string searchId = promptInput("Enter Patient ID: ");

        for (const auto& p : patients) {
            if (p.getId() == searchId) {
                cout << "\nRecord found:\n";
                cout << "Name: " << p.getName() << "\nDOB: " << p.getDob() << "\n";
                cout << "Phone: " << p.getPhone() << "\n";
                cout << "Blood Type: " << p.getBloodType() << "\nAllergies: " << p.getAllergies() << "\n";
                cout << "Diagnosis: " << p.getDiagnosis() << "\n";
                cout << "Prescriptions: " << p.getPrescriptions() << "\n";
                pauseMenu();
                return;
            }
        }
        cout << "Error: Patient ID " << searchId << " not found.\n";
        pauseMenu();
    }

    void updatePatient() {
        clearConsole();
        cout << "=== Update Patient ===\n";
        string updateId = promptInput("Enter Patient ID to update: ");
        
        for (auto& p : patients) {
            if (p.getId() == updateId) {
                cout << "\nUpdating records for " << p.getName() << "\n";
                cout << "(Leave blank and press Enter to keep current data)\n\n";
                
                string temp;
                cout << "New Phone [" << p.getPhone() << "]: ";
                getline(cin, temp);
                if (!temp.empty()) p.setPhone(temp);

                cout << "New Diagnosis [" << p.getDiagnosis() << "]: ";
                getline(cin, temp);
                if (!temp.empty()) p.setDiagnosis(temp);

                cout << "New Prescriptions [" << p.getPrescriptions() << "]: ";
                getline(cin, temp);
                if (!temp.empty()) p.setPrescriptions(temp);

                saveData();
                cout << "\nPatient records updated.\n";
                pauseMenu();
                return;
            }
        }
        cout << "Error: Patient ID not found.\n";
        pauseMenu();
    }
};

int main() {
    ClinicSystem sys;
    string choice;

    clearConsole();

    while (true) {
        cout << "=== Clinic Management System ===\n";
        cout << "1. Add Patient\n";
        cout << "2. View All Patients\n";
        cout << "3. Search Patient\n";
        cout << "4. Update Patient\n";
        cout << "5. Exit\n";
        cout << "Choice: ";
        
        getline(cin, choice);

        if (choice == "1") sys.addPatient();
        else if (choice == "2") sys.viewPatients();
        else if (choice == "3") sys.searchPatient();
        else if (choice == "4") sys.updatePatient();
        else if (choice == "5") {
            cout << "Exiting program...\n";
            return 0;
        }
        else {
            cout << "Invalid input. Please try again.\n";
            pauseMenu();
        }
    }
}
