import java.io.*;
import java.util.*;

class Patient {
    private String id, name, phone, dob, bloodType, allergies, diagnosis, prescriptions;

    public Patient(String id, String name, String phone, String dob, String bloodType, String allergies, String diagnosis, String prescriptions) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.dob = dob;
        this.bloodType = bloodType;
        this.allergies = allergies;
        this.diagnosis = diagnosis;
        this.prescriptions = prescriptions;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getDob() { return dob; }
    public String getBloodType() { return bloodType; }
    public String getAllergies() { return allergies; }
    public String getDiagnosis() { return diagnosis; }
    public String getPrescriptions() { return prescriptions; }

    public void setPhone(String phone) { this.phone = phone; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public void setPrescriptions(String prescriptions) { this.prescriptions = prescriptions; }

    public String toFormat() {
        return id + "|" + name + "|" + phone + "|" + dob + "|" + bloodType + "|" + allergies + "|" + diagnosis + "|" + prescriptions;
    }
}

public class ClinicSystem {
    private ArrayList<Patient> patients;
    private final String filename = "patients_data.txt";
    private Scanner scanner;

    public ClinicSystem() {
        patients = new ArrayList<>();
        scanner = new Scanner(System.in);
        loadData();
    }

    private void clearConsole() {
        for (int i = 0; i < 30; i++) {
            System.out.println();
        }
    }

    private void pauseMenu() {
        System.out.println("\nPress Enter to continue...");
        scanner.nextLine();
        clearConsole();
    }

    private String generateId() {
        if (patients.isEmpty()) return "1001";
        int lastId = Integer.parseInt(patients.get(patients.size() - 1).getId());
        return String.valueOf(lastId + 1);
    }

    private String promptInput(String promptText) {
        String input;
        while (true) {
            System.out.print(promptText);
            input = scanner.nextLine();
            
            if (!input.trim().isEmpty()) {
                return input;
            }
            System.out.println("  -> This field is required. Please enter a value.");
        }
    }

    private void loadData() {
        patients.clear();
        try {
            File file = new File(filename);
            if (!file.exists()) return;

            BufferedReader reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                String[] data = line.split("\\|", -1); 
                if (data.length == 8) {
                    patients.add(new Patient(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]));
                }
            }
            reader.close();
        } catch (IOException e) {
            System.out.println("Error loading database file.");
        }
    }

    private void saveData() {
        try {
            PrintWriter writer = new PrintWriter(new FileWriter(filename));
            for (Patient p : patients) {
                writer.println(p.toFormat());
            }
            writer.close();
        } catch (IOException e) {
            System.out.println("Error saving to database file.");
        }
    }

    public void addPatient() {
        clearConsole();
        System.out.println("=== Add New Patient ===");
        
        String name = promptInput("Name: ");
        String phone = promptInput("Phone: ");
        String dob = promptInput("DOB (DD/MM/YYYY): ");
        String blood = promptInput("Blood Type: ");
        String alg = promptInput("Allergies (or 'None'): ");
        String diag = promptInput("Diagnosis (or 'N/A'): ");
        String meds = promptInput("Medications (or 'N/A'): ");

        Patient newPatient = new Patient(generateId(), name, phone, dob, blood, alg, diag, meds);
        patients.add(newPatient);
        saveData();
        
        System.out.println("\nPatient successfully added. ID assigned: " + newPatient.getId());
        pauseMenu();
    }

    public void viewPatients() {
        clearConsole();
        System.out.println("=== Patient List ===");
        if (patients.isEmpty()) {
            System.out.println("No records found.");
        } else {
            System.out.printf("%-6s %-20s %-15s %s\n", "ID", "Name", "Phone", "Diagnosis");
            System.out.println("------------------------------------------------------------");
            for (Patient p : patients) {
                System.out.printf("%-6s %-20s %-15s %s\n", p.getId(), p.getName(), p.getPhone(), p.getDiagnosis());
            }
        }
        pauseMenu();
    }

    public void searchPatient() {
        clearConsole();
        System.out.println("=== Search Patient ===");
        String searchId = promptInput("Enter Patient ID: ");

        for (Patient p : patients) {
            if (p.getId().equals(searchId)) {
                System.out.println("\nRecord found:");
                System.out.println("Name: " + p.getName() + "\nDOB: " + p.getDob());
                System.out.println("Phone: " + p.getPhone());
                System.out.println("Blood Type: " + p.getBloodType() + "\nAllergies: " + p.getAllergies());
                System.out.println("Diagnosis: " + p.getDiagnosis());
                System.out.println("Prescriptions: " + p.getPrescriptions());
                pauseMenu();
                return;
            }
        }
        System.out.println("Error: Patient ID " + searchId + " not found.");
        pauseMenu();
    }

    public void updatePatient() {
        clearConsole();
        System.out.println("=== Update Patient ===");
        String updateId = promptInput("Enter Patient ID to update: ");
        
        for (Patient p : patients) {
            if (p.getId().equals(updateId)) {
                System.out.println("\nUpdating records for " + p.getName());
                System.out.println("(Leave blank and press Enter to keep current data)\n");
                
                System.out.print("New Phone [" + p.getPhone() + "]: ");
                String temp = scanner.nextLine();
                if (!temp.trim().isEmpty()) p.setPhone(temp);

                System.out.print("New Diagnosis [" + p.getDiagnosis() + "]: ");
                temp = scanner.nextLine();
                if (!temp.trim().isEmpty()) p.setDiagnosis(temp);

                System.out.print("New Prescriptions [" + p.getPrescriptions() + "]: ");
                temp = scanner.nextLine();
                if (!temp.trim().isEmpty()) p.setPrescriptions(temp);

                saveData();
                System.out.println("\nPatient records updated.");
                pauseMenu();
                return;
            }
        }
        System.out.println("Error: Patient ID not found.");
        pauseMenu();
    }

    public void start() {
        clearConsole();
        while (true) {
            System.out.println("=== Clinic Management System ===");
            System.out.println("1. Add Patient");
            System.out.println("2. View All Patients");
            System.out.println("3. Search Patient");
            System.out.println("4. Update Patient");
            System.out.println("5. Exit");
            System.out.print("Choice: ");
            
            String choice = scanner.nextLine();

            switch (choice) {
                case "1": addPatient(); break;
                case "2": viewPatients(); break;
                case "3": searchPatient(); break;
                case "4": updatePatient(); break;
                case "5": 
                    System.out.println("Exiting program...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid input. Please try again.");
                    pauseMenu();
            }
        }
    }

    public static void main(String[] args) {
        ClinicSystem sys = new ClinicSystem();
        sys.start();
    }
}
