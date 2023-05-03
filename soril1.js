 public class MyThread implements Runnable {
    private String name;
    private int priority;
    private boolean isAlive;

    public MyThread(String name, int priority) {
        this.name = name;
        this.priority = priority;
        this.isAlive = true;
    }

    @Override
    public void run() {
        System.out.println("Thread " + name + " started.");
        for (int i = 0; i < 5; i++) {
            System.out.println(name + ": " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("Thread " + name + " interrupted.");
            }
        }
        System.out.println("Thread " + name + " finished.");
        isAlive = false;
    }

    public void start() {
        Thread thread = new Thread(this);
        thread.setName(name);
        thread.setPriority(priority);
        thread.start();
    }

    public boolean isAlive() {
        return isAlive;
    }

    public static void main(String[] args) {
        MyThread thread1 = new MyThread("Thread 1", Thread.NORM_PRIORITY);
        MyThread thread2 = new MyThread("Thread 2", Thread.MAX_PRIORITY);
        thread1.start();
        thread2.start();
        while (thread1.isAlive() || thread2.isAlive()) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println("Main thread interrupted.");
            }
        }
        System.out.println("All threads finished.");
    }
}