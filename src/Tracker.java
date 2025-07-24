import java.util.HashMap;

public class Tracker {
    public static void main(String[] args) throws Exception {
        HashMap<String, Integer> records = new HashMap<>();
//        java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
        records.put("Arnab", 0); // Initialize with a name and zero offense
        records.put("Azam", 0);
        records.put("Prantik", 0);
        records.put("Rial", 0);
    }

    static void addOffence(HashMap records, String name) {
        if (records.containsKey(name)) {
            int count = (int) records.get(name);
            records.put(name, count + 1);
            if((count + 1) == 5) {
                System.out.println("Congratulations!! Your Treat!!");
                records.put(name, 0);
            } else {
                System.out.println("You have " + (count + 1) + " offences.");
            }
        } else {
            records.put(name, 1);
        }
    }
}
